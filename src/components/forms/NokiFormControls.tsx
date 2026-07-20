import type { ReactNode } from "react";

export type Option = {
  value: string;
  label: string;
};

type BaseControlProps = {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
};

export function FormField({
  name,
  label,
  required,
  error,
  hint,
  children,
}: BaseControlProps & { children: ReactNode }) {
  return (
    <div className="noki-form-field">
      <label htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="noki-form-hint" id={`${name}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="noki-form-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  name,
  label,
  value,
  onChange,
  required,
  error,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
}: BaseControlProps & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url" | "password";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal";
  placeholder?: string;
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <FormField name={name} label={label} required={required} error={error} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        spellCheck={type === "text" ? undefined : false}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      />
    </FormField>
  );
}

export function SelectInput({
  name,
  label,
  value,
  onChange,
  options,
  required,
  error,
  hint,
  placeholder,
}: BaseControlProps & {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <FormField name={name} label={label} required={required} error={error} hint={hint}>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      >
        <option value="">{placeholder ?? "—"}</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export function TextareaInput({
  name,
  label,
  value,
  onChange,
  required,
  error,
  hint,
  placeholder,
}: BaseControlProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

  return (
    <FormField name={name} label={label} required={required} error={error} hint={hint}>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      />
    </FormField>
  );
}

export function CheckboxField({
  name,
  label,
  checked,
  onChange,
  required,
  error,
}: BaseControlProps & {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="noki-checkbox-field">
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <span>
          {label}
          {required ? " *" : ""}
        </span>
      </label>
      {error ? (
        <p className="noki-form-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckboxGroup({
  legend,
  name,
  options,
  values,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
}) {
  function toggle(value: string, checked: boolean) {
    onChange(checked ? [...values, value] : values.filter((item) => item !== value));
  }

  return (
    <fieldset
      className="noki-check-grid"
      data-invalid={error ? "true" : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend>{legend}</legend>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={(event) => toggle(option.value, event.target.checked)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="noki-form-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function SegmentedGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset
      className="noki-segmented-group"
      data-invalid={error ? "true" : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend>{legend}</legend>
      <div>
        {options.map((option) => (
          <label data-active={value === option.value} key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="noki-form-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function focusFirstInvalid() {
  requestAnimationFrame(() => {
    const firstInvalid = document.querySelector<HTMLElement>(
      '[aria-invalid="true"], [data-invalid="true"], .noki-form-error',
    );
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    firstInvalid?.focus?.({ preventScroll: true });
    firstInvalid?.scrollIntoView({ block: "center", behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value: string) {
  if (!value.trim()) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
