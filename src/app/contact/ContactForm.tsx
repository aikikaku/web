'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
}

const categories = [
  { value: '', label: 'お問い合わせ種別を選択してください' },
  { value: 'property', label: '物件について' },
  { value: 'sell', label: '売却について' },
  { value: 'other', label: 'その他' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (formData.phone && !/^[\d\-+() ]+$/.test(formData.phone)) {
      newErrors.phone = '正しい電話番号を入力してください';
    }

    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }

    return newErrors;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        '送信中にエラーが発生しました。しばらくしてからもう一度お試しください。',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-cream rounded-3xl p-8 tablet:p-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3cb1ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="font-mincho text-2xl tablet:text-[32px] tracking-wider text-dark-green">
            お問い合わせありがとうございます
          </h2>
          <p className="text-body-m font-gothic font-medium text-dark-green/70 leading-[2]">
            内容を確認次第、担当者よりご連絡いたします。
            <br />
            しばらくお待ちくださいませ。
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* お名前 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-gothic font-medium text-body-m text-dark-green"
        >
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="例: 山田 太郎"
          className={`w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors ${
            errors.name
              ? 'border-red-400 focus:border-red-400'
              : 'border-dark-green/20 focus:border-accent-blue'
          }`}
        />
        {errors.name && (
          <p className="text-body-s text-red-500 font-gothic">{errors.name}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-gothic font-medium text-body-m text-dark-green"
        >
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="例: taro@example.com"
          className={`w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors ${
            errors.email
              ? 'border-red-400 focus:border-red-400'
              : 'border-dark-green/20 focus:border-accent-blue'
          }`}
        />
        {errors.email && (
          <p className="text-body-s text-red-500 font-gothic">
            {errors.email}
          </p>
        )}
      </div>

      {/* 電話番号 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="font-gothic font-medium text-body-m text-dark-green"
        >
          電話番号
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="例: 055-976-5300"
          className={`w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors ${
            errors.phone
              ? 'border-red-400 focus:border-red-400'
              : 'border-dark-green/20 focus:border-accent-blue'
          }`}
        />
        {errors.phone && (
          <p className="text-body-s text-red-500 font-gothic">
            {errors.phone}
          </p>
        )}
      </div>

      {/* お問い合わせ種別 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="font-gothic font-medium text-body-m text-dark-green"
        >
          お問い合わせ種別 <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232a363b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_16px_center] bg-no-repeat ${
            !formData.category ? 'text-dark-green/30' : ''
          } ${
            errors.category
              ? 'border-red-400 focus:border-red-400'
              : 'border-dark-green/20 focus:border-accent-blue'
          }`}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value} disabled={!cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-body-s text-red-500 font-gothic">
            {errors.category}
          </p>
        )}
      </div>

      {/* お問い合わせ内容 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-gothic font-medium text-body-m text-dark-green"
        >
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="お問い合わせ内容をご記入ください"
          className={`w-full px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-dark-green placeholder:text-dark-green/30 outline-none transition-colors resize-vertical ${
            errors.message
              ? 'border-red-400 focus:border-red-400'
              : 'border-dark-green/20 focus:border-accent-blue'
          }`}
        />
        {errors.message && (
          <p className="text-body-s text-red-500 font-gothic">
            {errors.message}
          </p>
        )}
      </div>

      {/* エラーメッセージ */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-body-s text-red-600 font-gothic">{submitError}</p>
        </div>
      )}

      {/* 送信ボタン */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>
    </form>
  );
}
