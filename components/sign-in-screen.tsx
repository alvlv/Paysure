"use client";

import { MeshField } from "@/components/mesh-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useId, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";

type Locale = "en" | "zh" | "es";
type Mode = "signin" | "register" | "forgot" | "code";

const locales: { id: Locale; label: string }[] = [
  { id: "en", label: "English" },
  { id: "zh", label: "中文" },
  { id: "es", label: "Español" },
];

const copy = {
  en: {
    headline: "The AI-native intelligence system of global payments",
    welcome: "Welcome to Paysure",
    create: "Create your Paysure account",
    reset: "Reset your password",
    codeTitle: "Sign in with a code",
    identifier: "Phone number / Email",
    password: "Password",
    code: "Verification code",
    signIn: "Sign in",
    createAccount: "Create account",
    sendReset: "Send reset link",
    sendCode: "Send code",
    register: "Register now",
    forgot: "Forgot password?",
    hasAccount: "Already have an account?",
    back: "Back to sign in",
    or: "or",
    google: "Continue with Google",
    codeAction: "Sign in with code",
    legalBefore: "By using Paysure, you agree to the ",
    terms: "Terms of Service",
    legalMid: " and ",
    privacy: "Privacy Policy",
    copyright: "©2026 PaySure",
    showPassword: "Show password",
    hidePassword: "Hide password",
    needIdentifier: "Enter a phone number or email.",
    badEmail: "That email doesn’t look complete.",
    badPhone: "Enter a phone number with 6 to 15 digits.",
    needPassword: "Enter your password.",
    shortPassword: "Use at least 8 characters.",
    needCode: "Enter the 6-digit code.",
    signedIn: "Signed in",
    signedInDetail: "This preview stays on your device. Nothing was sent.",
    accountReady: "Account ready",
    resetSent: "Reset link ready",
    codeSent: "Code sent",
    sentTo: "Use any 6-digit code to continue. Nothing was sent to",
    googleNote: "Google sign-in isn’t connected in this preview.",
    close: "Close",
    termsBody:
      "Paysure provides payment intelligence tools for merchants, banks, and wallets. This screen is a design preview, so these terms are not a binding agreement.",
    privacyBody:
      "This preview stores nothing. Phone numbers, emails, and passwords you type stay in the browser and are cleared when you leave the page.",
  },
  zh: {
    headline: "全球支付的 AI 原生智能系统",
    welcome: "欢迎使用 Paysure",
    create: "创建你的 Paysure 账户",
    reset: "重置密码",
    codeTitle: "使用验证码登录",
    identifier: "手机号 / 邮箱",
    password: "密码",
    code: "验证码",
    signIn: "登录",
    createAccount: "创建账户",
    sendReset: "发送重置链接",
    sendCode: "发送验证码",
    register: "立即注册",
    forgot: "忘记密码？",
    hasAccount: "已有账户？",
    back: "返回登录",
    or: "或",
    google: "使用 Google 继续",
    codeAction: "验证码登录",
    legalBefore: "使用 Paysure 即表示你同意",
    terms: "服务条款",
    legalMid: "和",
    privacy: "隐私政策",
    copyright: "©2026 PaySure",
    showPassword: "显示密码",
    hidePassword: "隐藏密码",
    needIdentifier: "请输入手机号或邮箱。",
    badEmail: "邮箱格式不完整。",
    badPhone: "请输入 6 到 15 位数字的手机号。",
    needPassword: "请输入密码。",
    shortPassword: "密码至少 8 位。",
    needCode: "请输入 6 位验证码。",
    signedIn: "已登录",
    signedInDetail: "这是本地预览，信息不会被发送。",
    accountReady: "账户已就绪",
    resetSent: "重置链接已准备好",
    codeSent: "验证码已发送",
    sentTo: "输入任意 6 位数字即可继续。不会真正发送到",
    googleNote: "此预览未连接 Google 登录。",
    close: "关闭",
    termsBody:
      "Paysure 为商户、银行和钱包提供支付智能工具。当前页面是设计预览，这些条款不构成协议。",
    privacyBody:
      "此预览不会存储任何内容。你输入的手机号、邮箱和密码只留在浏览器中，离开页面后即清除。",
  },
  es: {
    headline: "El sistema de inteligencia nativo de IA para pagos globales",
    welcome: "Bienvenido a Paysure",
    create: "Crea tu cuenta de Paysure",
    reset: "Restablece tu contraseña",
    codeTitle: "Entra con un código",
    identifier: "Teléfono / correo",
    password: "Contraseña",
    code: "Código de verificación",
    signIn: "Entrar",
    createAccount: "Crear cuenta",
    sendReset: "Enviar enlace",
    sendCode: "Enviar código",
    register: "Regístrate",
    forgot: "¿Olvidaste tu contraseña?",
    hasAccount: "¿Ya tienes cuenta?",
    back: "Volver a entrar",
    or: "o",
    google: "Continuar con Google",
    codeAction: "Entrar con código",
    legalBefore: "Al usar Paysure, aceptas los ",
    terms: "Términos del servicio",
    legalMid: " y la ",
    privacy: "Política de privacidad",
    copyright: "©2026 PaySure",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
    needIdentifier: "Introduce un teléfono o un correo.",
    badEmail: "Ese correo no está completo.",
    badPhone: "Introduce un teléfono de 6 a 15 dígitos.",
    needPassword: "Introduce tu contraseña.",
    shortPassword: "Usa al menos 8 caracteres.",
    needCode: "Introduce el código de 6 dígitos.",
    signedIn: "Sesión iniciada",
    signedInDetail: "Esta vista previa se queda en tu dispositivo. No se envió nada.",
    accountReady: "Cuenta lista",
    resetSent: "Enlace listo",
    codeSent: "Código enviado",
    sentTo: "Usa cualquier código de 6 dígitos. No se envió nada a",
    googleNote: "El acceso con Google no está conectado en esta vista previa.",
    close: "Cerrar",
    termsBody:
      "Paysure ofrece herramientas de inteligencia de pagos para comercios, bancos y billeteras. Esta pantalla es una vista previa y estos términos no son un acuerdo.",
    privacyBody:
      "Esta vista previa no guarda nada. Los teléfonos, correos y contraseñas que escribas permanecen en el navegador y se borran al salir.",
  },
} as const;

type Copy = (typeof copy)[Locale];

function identifierError(value: string, text: Copy) {
  const trimmed = value.trim();
  if (!trimmed) return text.needIdentifier;
  if (trimmed.includes("@")) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? "" : text.badEmail;
  }
  const digits = trimmed.replace(/[^\d]/g, "");
  return digits.length >= 6 && digits.length <= 15 ? "" : text.badPhone;
}

export function SignInScreen() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mode, setMode] = useState<Mode>("signin");
  const [identifier, setIdentifier] = useState("13834567890");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string; secret?: string }>({});
  const [success, setSuccess] = useState("");
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);
  const [pending, setPending] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const text = copy[locale];
  const formId = useId();

  useEffect(() => {
    if (!languageOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!languageRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [languageOpen]);

  function resetFeedback() {
    setErrors({});
    setNotice("");
    setSuccess("");
  }

  function switchMode(next: Mode) {
    setMode(next);
    setCode("");
    setCodeSent(false);
    setShowPassword(false);
    resetFeedback();
  }

  const title =
    mode === "register"
      ? text.create
      : mode === "forgot"
        ? text.reset
        : mode === "code"
          ? text.codeTitle
          : text.welcome;

  const submitLabel =
    mode === "register"
      ? text.createAccount
      : mode === "forgot"
        ? text.sendReset
        : mode === "code"
          ? codeSent
            ? text.signIn
            : text.sendCode
          : text.signIn;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: { identifier?: string; secret?: string } = {};
    const idError = identifierError(identifier, text);
    if (idError) nextErrors.identifier = idError;

    if (mode === "signin" || mode === "register") {
      if (!password) nextErrors.secret = text.needPassword;
      else if (password.length < 8) nextErrors.secret = text.shortPassword;
    }

    if (mode === "code" && codeSent && !/^\d{6}$/.test(code.trim())) {
      nextErrors.secret = text.needCode;
    }

    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length > 0) {
      setSuccess("");
      return;
    }

    if (mode === "code" && !codeSent) {
      setCodeSent(true);
      setSuccess("");
      return;
    }

    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setPending(false);
    if (mode === "forgot") setSuccess(text.resetSent);
    else if (mode === "register") setSuccess(text.accountReady);
    else if (mode === "code") setSuccess(text.codeSent);
    else setSuccess(text.signedIn);
  }

  return (
    <div className="relative h-dvh overflow-hidden">
      <MeshField />
      <main className="relative z-10 flex h-full min-h-0 flex-col gap-4 overflow-hidden p-4 lg:flex-row lg:gap-6">
        <section className="relative flex shrink-0 flex-col px-6 pt-6 sm:px-10 lg:h-full lg:min-w-0 lg:flex-1 lg:px-16 lg:pt-8">
          <a href="/" className="flex w-fit items-center" aria-label="Paysure">
            <span className="flex size-10 items-center justify-center">
              <img src="/brand/logo-mark.svg" alt="" width={21} height={40} className="brightness-0 invert" />
            </span>
            <span className="flex h-10 items-center pt-[7px]">
              <img src="/brand/wordmark.svg" alt="" width={108} height={25} className="brightness-0 invert" />
            </span>
          </a>

          <div className="mt-6 flex max-w-[564px] flex-col gap-4 lg:mt-[92px] lg:gap-6">
            <h1 className="text-[32px] font-medium leading-[44px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[64px]">
              {text.headline}
            </h1>
            <span className="h-1.5 w-10 rounded-full bg-white" />
          </div>

          <p className="mt-6 text-sm leading-5 text-white/70 lg:absolute lg:bottom-8 lg:left-16 lg:mt-0">
            {text.copyright}
          </p>
        </section>

        <section className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-3xl border border-[#f3f3f3] bg-white px-6 py-6 shadow-[0_0_16px_rgba(118,92,249,0.04)] sm:px-8 lg:h-full lg:w-[460px] lg:flex-none lg:py-8">
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10" ref={languageRef}>
            <button
              type="button"
              className="flex items-center gap-2 text-sm leading-5 text-[#777080] outline-none hover:text-[#251e35] focus-visible:text-[#251e35]"
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
              onClick={() => setLanguageOpen((open) => !open)}
            >
              {locales.find((item) => item.id === locale)?.label}
              <img
                src="/brand/chevron.svg"
                alt=""
                width={16}
                height={16}
                className={`transition-transform ${languageOpen ? "rotate-180" : ""}`}
              />
            </button>
            {languageOpen ? (
              <ul
                role="listbox"
                aria-label="Language"
                className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-2xl border border-[#e6e1ec] bg-white p-1 shadow-[0_12px_32px_rgba(37,30,53,0.08)]"
              >
                {locales.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item.id === locale}
                      className={`flex w-full rounded-xl px-3 py-2 text-left text-sm ${
                        item.id === locale
                          ? "bg-[#f4efff] text-[#251e35]"
                          : "text-[#777080] hover:bg-[#faf8ff] hover:text-[#251e35]"
                      }`}
                      onClick={() => {
                        setLocale(item.id);
                        setLanguageOpen(false);
                        resetFeedback();
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain">
            <div className="m-auto w-full max-w-[380px] py-8">
            <h2 className="text-[28px] font-medium leading-10 text-[#251e35] sm:text-[32px] sm:leading-[48px]">
              {success || title}
            </h2>
            {success ? (
              <p className="mt-3 text-sm leading-5 text-[#777080]">
                {mode === "code" || mode === "forgot"
                  ? `${text.sentTo} ${identifier.trim()}.`
                  : text.signedInDetail}
              </p>
            ) : null}

            <form className="mt-10 flex flex-col gap-6" onSubmit={onSubmit} noValidate>
              <Field
                id={`${formId}-id`}
                label={text.identifier}
                value={identifier}
                error={errors.identifier}
                autoComplete="username"
                onChange={(value) => {
                  setIdentifier(value);
                  setErrors((current) => ({ ...current, identifier: undefined }));
                  setSuccess("");
                }}
              />

              {mode === "code" && codeSent ? (
                <Field
                  id={`${formId}-code`}
                  label={text.code}
                  value={code}
                  error={errors.secret}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onChange={(value) => {
                    setCode(value.replace(/[^\d]/g, "").slice(0, 6));
                    setErrors((current) => ({ ...current, secret: undefined }));
                  }}
                />
              ) : null}

              {mode === "signin" || mode === "register" ? (
                <Field
                  id={`${formId}-password`}
                  label={text.password}
                  value={password}
                  error={errors.secret}
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  autoFocus={mode === "signin"}
                  onChange={(value) => {
                    setPassword(value);
                    setErrors((current) => ({ ...current, secret: undefined }));
                    setSuccess("");
                  }}
                  trailing={
                    <button
                      type="button"
                      className="relative grid size-5 place-items-center text-[#777080] hover:text-[#251e35]"
                      aria-label={showPassword ? text.hidePassword : text.showPassword}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((shown) => !shown)}
                    >
                      <img src="/brand/eye.svg" alt="" width={20} height={20} />
                      {showPassword ? (
                        <span className="pointer-events-none absolute h-px w-4 rotate-[-35deg] bg-[#777080]" />
                      ) : null}
                    </button>
                  }
                />
              ) : null}

              <Button
                type="submit"
                disabled={pending}
                className="h-12 w-full rounded-2xl bg-[#251e35] text-sm font-medium text-white hover:bg-[#3a314c] focus-visible:ring-[#9670ff]/40"
              >
                {pending ? "…" : submitLabel}
              </Button>

              <div className="flex items-start justify-between gap-4 text-sm leading-5">
                {mode === "signin" ? (
                  <>
                    <button
                      type="button"
                      className="text-[#9670ff] hover:underline"
                      onClick={() => switchMode("register")}
                    >
                      {text.register}
                    </button>
                    <button
                      type="button"
                      className="text-right text-[#9670ff] hover:underline"
                      onClick={() => switchMode("forgot")}
                    >
                      {text.forgot}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="text-[#9670ff] hover:underline"
                    onClick={() => switchMode("signin")}
                  >
                    {mode === "register" ? text.hasAccount : text.back}
                  </button>
                )}
              </div>

              {mode === "signin" || mode === "register" ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-[#e6e1ec]" />
                    <span className="text-sm leading-5 text-[#777080]">{text.or}</span>
                    <span className="h-px flex-1 bg-[#e6e1ec]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full gap-2 rounded-2xl border-[#e6e1ec] bg-white text-sm font-medium text-[#251e35] hover:bg-[#faf8ff]"
                      onClick={() => {
                        setSuccess("");
                        setNotice(text.googleNote);
                      }}
                    >
                      <img src="/brand/google.svg" alt="" width={20} height={20} />
                      {text.google}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full gap-2 rounded-2xl border-[#e6e1ec] bg-white text-sm font-medium text-[#251e35] hover:bg-[#faf8ff]"
                      onClick={() => switchMode(mode === "register" ? "signin" : "code")}
                    >
                      <img src="/brand/chats.svg" alt="" width={18} height={18} />
                      {text.codeAction}
                    </Button>
                  </div>
                </>
              ) : null}

              {notice ? (
                <p className="text-sm leading-5 text-[#777080]" role="status">
                  {notice}
                </p>
              ) : null}
              {mode === "code" && codeSent && !success ? (
                <p className="text-sm leading-5 text-[#777080]" role="status">
                  {text.sentTo} {identifier.trim()}.
                </p>
              ) : null}
            </form>
            </div>
          </div>

          <p className="mx-auto mt-4 w-full max-w-[380px] shrink-0 text-center text-sm leading-5 text-[#a49cac] lg:mt-6">
            {text.legalBefore}
            <button
              type="button"
              className="font-medium text-[#251e35] hover:underline"
              onClick={() => setLegal("terms")}
            >
              {text.terms}
            </button>
            {text.legalMid}
            <button
              type="button"
              className="font-medium text-[#251e35] hover:underline"
              onClick={() => setLegal("privacy")}
            >
              {text.privacy}
            </button>
          </p>
        </section>
      </main>

      {legal ? (
        <div className="fixed inset-0 z-30 grid place-items-center bg-[#251e35]/30 p-4" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_16px_48px_rgba(37,30,53,0.16)]"
          >
            <h3 id="legal-title" className="text-lg font-medium text-[#251e35]">
              {legal === "terms" ? text.terms : text.privacy}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#777080]">
              {legal === "terms" ? text.termsBody : text.privacyBody}
            </p>
            <Button
              type="button"
              className="mt-6 h-10 rounded-2xl bg-[#251e35] px-5 text-white hover:bg-[#3a314c]"
              onClick={() => setLegal(null)}
            >
              {text.close}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  trailing,
  autoFocus = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  trailing?: ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`flex h-[74px] items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 transition-colors ${
          error ? "border-[#d14343]" : "border-[#e6e1ec] focus-within:border-[#9670ff]"
        }`}
      >
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <span className="text-sm leading-5 text-[#777080]">{label}</span>
          <Input
            id={id}
            type={type}
            value={value}
            autoComplete={autoComplete}
            inputMode={inputMode}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            autoFocus={autoFocus}
            onChange={(event) => onChange(event.target.value)}
            className="h-6 rounded-none border-0 bg-transparent px-0 py-0 text-base leading-5 text-[#251e35] shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-base"
          />
        </span>
        {trailing ? <span className="relative shrink-0">{trailing}</span> : null}
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm leading-5 text-[#d14343]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
