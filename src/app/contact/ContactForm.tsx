'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Select from '@/components/ui/interactive/Select';
import Toggle from '@/components/ui/interactive/Toggle';
import {
  FORMS,
  TAB_KINDS,
  describeValues,
  parseInquiry,
  type FieldDef,
  type FieldValues,
  type FormKind,
  type Inquiry,
  type InquiryErrors,
  type InquiryInput,
} from '@/lib/contact/inquiry';

interface ContactFormProps {
  initialKind: FormKind;
  /** 物件ページから来たときの物件。あれば物件お問い合わせのフォームだけを出す（物件カードはページ側で出す） */
  property: { id: string; title: string; location: string } | null;
}

type Status = 'editing' | 'confirming' | 'sending' | 'sent' | 'failed';

const TAB_QUERY: Record<FormKind, string> = { general: '', buy: '?category=buy', sell: '?category=sell', property: '' };

const inputClass = (hasError: boolean) =>
  `w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors ${
    hasError ? 'border-red-400 focus:border-red-400' : 'border-dark-green/20 focus:border-accent-blue'
  }`;


function RequiredMark({ required }: { required: boolean }) {
  return required ? <span className="ml-2 text-body-s text-red-500">必須</span> : <span className="ml-2 text-body-s text-dark-green/50">任意</span>;
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={`${id}-error`} className="text-body-s text-red-500 font-gothic">
      {error}
    </p>
  ) : null;
}

function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: FieldValues[string] | undefined;
  error?: string;
  onChange: (value: FieldValues[string]) => void;
}) {
  const a11y = { 'aria-invalid': !!error, 'aria-describedby': error ? `${field.name}-error` : undefined };

  if (field.type === 'multi') {
    const picked = Array.isArray(value) ? value : [];
    return (
      <fieldset className="flex flex-col gap-3" {...a11y}>
        <legend className="font-gothic font-medium text-body-m text-dark-green mb-3">
          {field.label}
          <RequiredMark required={field.required} />
        </legend>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-6 gap-y-3">
          {field.options!.map((option, i) => (
            <label key={option} className="flex items-center gap-3 font-gothic text-body-m text-dark-green cursor-pointer">
              <input
                type="checkbox"
                id={`${field.name}-${i}`}
                checked={picked.includes(option)}
                onChange={(e) => onChange(e.target.checked ? [...picked, option] : picked.filter((p) => p !== option))}
                className="w-5 h-5 shrink-0 accent-accent-blue"
              />
              {option}
            </label>
          ))}
        </div>
        <ErrorText id={field.name} error={error} />
      </fieldset>
    );
  }

  const text = typeof value === 'string' ? value : '';
  let control: ReactNode;
  if (field.type === 'textarea') {
    control = (
      <textarea
        id={field.name}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={field.placeholder}
        className={`${inputClass(!!error)} resize-y`}
        {...a11y}
      />
    );
  } else if (field.type === 'select') {
    control = (
      <Select
        id={field.name}
        value={text}
        options={field.options!}
        onChange={onChange}
        invalid={!!error}
        describedBy={a11y['aria-describedby']}
      />
    );
  } else {
    control = (
      <input
        type={field.type}
        id={field.name}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={field.autoComplete}
        inputMode={field.type === 'email' ? 'email' : undefined}
        placeholder={field.placeholder}
        className={inputClass(!!error)}
        {...a11y}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className="font-gothic font-medium text-body-m text-dark-green">
        {field.label}
        <RequiredMark required={field.required} />
      </label>
      {control}
      <ErrorText id={field.name} error={error} />
    </div>
  );
}


export default function ContactForm({ initialKind, property }: ContactFormProps) {
  const [kind, setKind] = useState<FormKind>(property ? 'property' : initialKind);
  const [values, setValues] = useState<FieldValues>({});
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>('editing');
  const [confirmed, setConfirmed] = useState<Inquiry | null>(null);
  const form = FORMS[kind];
  // 確認画面・受付完了画面に切り替わったら、その見出しまでスクロールする。
  // ページの一番上に戻すと、SP では物件情報・電話番号の欄を毎回スクロールしないと見出しにたどり着けない（高野さんのコメント）
  const screenTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === 'confirming' || status === 'sent') screenTopRef.current?.scrollIntoView({ block: 'start' });
  }, [status]);

  function input(): InquiryInput {
    return { kind, values, propertyId: property?.id ?? '', consent, website };
  }

  function switchTab(next: string) {
    const nextKind = next as FormKind;
    setKind(nextKind);
    setErrors({});
    window.history.replaceState(null, '', `/contact${TAB_QUERY[nextKind]}`);
  }

  function showErrors(next: InquiryErrors) {
    setErrors(next);
    setStatus('editing');
    const first = form.fields.find((field) => next[field.name]) ?? null;
    const id = first ? (first.type === 'multi' ? `${first.name}-0` : first.name) : next.consent ? 'consent' : null;
    requestAnimationFrame(() => id && document.getElementById(id)?.focus());
  }

  function handleConfirm(e: FormEvent) {
    e.preventDefault();
    const parsed = parseInquiry(input());
    if (!parsed.ok) return showErrors(parsed.errors);
    setConfirmed(parsed.inquiry);
    setStatus('confirming');
  }

  async function handleSend() {
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input()),
    }).catch(() => null);
    if (res?.ok) {
      setStatus('sent');
      return;
    }
    if (res?.status === 400) {
      const body = (await res.json().catch(() => null)) as { errors?: InquiryErrors } | null;
      return showErrors(body?.errors ?? {});
    }
    setStatus('failed');
  }

  if (status === 'sent') {
    return (
      <div ref={screenTopRef} className="bg-light-green rounded-3xl p-8 tablet:p-16 text-center scroll-mt-28" role="status">
        <h2 className="font-mincho text-heading-24 tablet:text-heading-32 text-dark-green mb-6" style={{ fontFeatureSettings: "'palt' 1" }}>
          お問い合わせを受け付けました
        </h2>
        <p className="text-body-m font-gothic font-medium text-dark-green leading-[2]">
          ご入力のメールアドレスに、受付のお知らせをお送りしました。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <p className="mt-4 text-body-s font-gothic text-dark-green/70 leading-[2]">
          受付のメールが届かない場合は、迷惑メールのフォルダをご確認いただくか、
          <br className="hidden tablet:inline" />
          お電話（055-976-5300）でお問い合わせください。
        </p>
      </div>
    );
  }

  if ((status === 'confirming' || status === 'sending' || status === 'failed') && confirmed) {
    return (
      <div ref={screenTopRef} className="flex flex-col gap-8 scroll-mt-28">
        <div className="flex flex-col gap-2">
          <h2 className="font-mincho text-heading-24 text-dark-green">入力内容の確認</h2>
          <p className="text-body-m font-gothic text-dark-green/70">以下の内容で送信します。よろしければ「送信する」を押してください。</p>
        </div>
        <dl className="flex flex-col border-t border-dark-green/20 font-gothic text-body-m text-dark-green">
          {[
            { label: 'お問い合わせの種類', value: form.label },
            ...(property ? [{ label: 'お問い合わせ物件', value: property.location || property.title }] : []),
            ...describeValues(confirmed),
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col tablet:flex-row gap-1 tablet:gap-6 py-4 border-b border-dark-green/20">
              <dt className="tablet:w-[14rem] shrink-0 font-medium">{label}</dt>
              <dd className="whitespace-pre-wrap break-words">{value}</dd>
            </div>
          ))}
        </dl>
        {status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
            <p className="text-body-s text-red-600 font-gothic leading-[1.8]">
              送信できませんでした。時間をおいてもう一度お試しいただくか、お電話（055-976-5300）でお問い合わせください。
            </p>
          </div>
        )}
        <div className="flex flex-col-reverse tablet:flex-row justify-center gap-4">
          <button
            type="button"
            onClick={() => setStatus('editing')}
            disabled={status === 'sending'}
            className="min-w-[12.5rem] h-14 rounded-full border border-dark-green font-gothic font-medium text-dark-green disabled:opacity-50"
          >
            入力画面に戻る
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={status === 'sending'}
            className="btn-primary min-w-[12.5rem] h-14 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? '送信しています…' : '送信する'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleConfirm} noValidate className="flex flex-col gap-8">
      {!property && (
        <div className="flex flex-col gap-3">
          <p className="font-gothic font-medium text-body-m text-dark-green">お問い合わせの種類</p>
          <Toggle
            options={TAB_KINDS.map((k) => ({ value: k, label: FORMS[k].label }))}
            value={kind}
            onChange={switchTab}
            className="w-full tablet:w-fit"
            buttonClassName="flex-1 h-12 px-3 tablet:px-6"
          />
        </div>
      )}
      <ErrorText id="property" error={errors.property} />

      {form.fields.map((field) => (
        <FieldInput
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={(value) => {
            setValues((prev) => ({ ...prev, [field.name]: value }));
            setErrors((prev) => ({ ...prev, [field.name]: '' }));
          }}
        />
      ))}

      {/* 人には見えない入力欄。機械による送信だけがここを埋める */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">ウェブサイト</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="flex items-center gap-3 font-gothic text-body-m text-dark-green cursor-pointer">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((prev) => ({ ...prev, consent: '' }));
            }}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="w-5 h-5 accent-accent-blue"
          />
          <span>
            <Link href="/privacy-policy" target="_blank" className="underline underline-offset-4 hover:opacity-60">
              プライバシーポリシー
            </Link>
            に同意する
          </span>
        </label>
        <ErrorText id="consent" error={errors.consent} />
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn-primary min-w-[12.5rem] h-14">
          入力内容を確認する
        </button>
      </div>
    </form>
  );
}
