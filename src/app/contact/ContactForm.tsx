'use client';

import Link from 'next/link';
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import {
  INQUIRY_CATEGORIES,
  parseInquiry,
  type InquiryCategory,
  type InquiryErrors,
  type InquiryInput,
} from '@/lib/contact/inquiry';

interface ContactFormProps {
  initialCategory: InquiryCategory | '';
  /** 物件詳細ページから来たときの物件 */
  property: { id: string; title: string } | null;
}

type Status = 'editing' | 'sending' | 'sent' | 'failed';

const PLACEHOLDERS: Record<InquiryCategory | '', string> = {
  '': 'お問い合わせ内容をご記入ください',
  property: '例: 内見を希望します。土日の午前中だと助かります。',
  buy: '例: 三島市内で、小学校に近い土地を探しています。予算は2,000万円ほどです。',
  sell: '例: 相続した実家（三島市○○町、築40年の一戸建て）の売却を考えています。まずは査定をお願いしたいです。',
  parking: '例: 加茂周辺で月極駐車場を1台分探しています。軽自動車です。',
  other: 'お問い合わせ内容をご記入ください',
};

const inputClass = (hasError: boolean) =>
  `w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors ${
    hasError ? 'border-red-400 focus:border-red-400' : 'border-dark-green/20 focus:border-accent-blue'
  }`;

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-gothic font-medium text-body-m text-dark-green">
        {label}
        {required ? <span className="ml-2 text-body-s text-red-500">必須</span> : <span className="ml-2 text-body-s text-dark-green/50">任意</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-body-s text-red-500 font-gothic">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ initialCategory, property }: ContactFormProps) {
  const [values, setValues] = useState<InquiryInput>({
    category: initialCategory,
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyId: property?.id ?? '',
    consent: false,
    website: '',
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>('editing');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const next = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseInquiry(values);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      document.getElementById(Object.keys(parsed.errors)[0])?.focus();
      return;
    }

    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).catch(() => null);
    if (res?.ok) {
      setStatus('sent');
      window.scrollTo({ top: 0 });
      return;
    }
    if (res?.status === 400) {
      const body = (await res.json().catch(() => null)) as { errors?: InquiryErrors } | null;
      setErrors(body?.errors ?? {});
      setStatus('editing');
      return;
    }
    setStatus('failed');
  }

  if (status === 'sent') {
    return (
      <div className="bg-light-green rounded-3xl p-8 tablet:p-16 text-center" role="status">
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

  const describedBy = (key: keyof InquiryErrors) => (errors[key] ? `${key}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {property && (
        <div className="rounded-xl bg-light-green px-5 py-4 font-gothic text-body-m text-dark-green">
          <p className="text-body-s text-dark-green/70">お問い合わせの物件</p>
          <p className="font-medium">{property.title}</p>
        </div>
      )}

      <Field id="category" label="お問い合わせの種類" required error={errors.category}>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={!!errors.category}
          aria-describedby={describedBy('category')}
          className={`${inputClass(!!errors.category)} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232a363b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_16px_center] bg-no-repeat ${
            values.category ? '' : 'text-dark-green/30'
          }`}
        >
          <option value="" disabled>
            選んでください
          </option>
          {(Object.keys(INQUIRY_CATEGORIES) as InquiryCategory[])
            .filter((key) => key !== 'property' || property)
            .map((key) => (
              <option key={key} value={key}>
                {INQUIRY_CATEGORIES[key]}
              </option>
            ))}
        </select>
      </Field>

      <Field id="name" label="お名前" required error={errors.name}>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          placeholder="例: 山田 太郎"
          aria-invalid={!!errors.name}
          aria-describedby={describedBy('name')}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field id="email" label="メールアドレス" required error={errors.email}>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={handleChange}
          placeholder="例: yamada@example.jp"
          aria-invalid={!!errors.email}
          aria-describedby={describedBy('email')}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field id="phone" label="電話番号" error={errors.phone}>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="例: 090-1234-5678"
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy('phone')}
          className={inputClass(!!errors.phone)}
        />
      </Field>

      <Field id="message" label="お問い合わせ内容" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={7}
          placeholder={PLACEHOLDERS[values.category as InquiryCategory | '']}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message')}
          className={`${inputClass(!!errors.message)} resize-y`}
        />
      </Field>

      {/* 人には見えない入力欄。機械による送信だけがここを埋める */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">ウェブサイト</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <label className="flex items-center gap-3 font-gothic text-body-m text-dark-green cursor-pointer">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={values.consent}
            onChange={handleChange}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy('consent')}
            className="w-5 h-5 accent-accent-blue"
          />
          <span>
            <Link href="/privacy-policy" target="_blank" className="underline underline-offset-4 hover:opacity-60">
              プライバシーポリシー
            </Link>
            に同意する
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="text-body-s text-red-500 font-gothic">
            {errors.consent}
          </p>
        )}
      </div>

      {status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
          <p className="text-body-s text-red-600 font-gothic leading-[1.8]">
            送信できませんでした。時間をおいてもう一度お試しいただくか、お電話（055-976-5300）でお問い合わせください。
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <button type="submit" disabled={status === 'sending'} className="btn-primary min-w-[12.5rem] h-14 disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'sending' ? '送信しています…' : '送信する'}
        </button>
      </div>
    </form>
  );
}
