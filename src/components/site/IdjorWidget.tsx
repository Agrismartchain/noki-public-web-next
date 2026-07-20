"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type IdjorWidgetProps = {
  language: Language;
};

type Message = {
  role: "assistant" | "user";
  text: string;
};

export function IdjorWidget({ language }: IdjorWidgetProps) {
  const labels = SITE_COPY[language].chat;
  const direction = language === "ar" ? "rtl" : "ltr";
  const triggerLabel = language === "fr" ? "Idjor IA" : language === "en" ? "Idjor AI" : "إدجور AI";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: labels.greeting }]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", text: labels.unavailable },
    ]);
    setInput("");
  }

  return (
    <div className="noki-idjor" dir={direction}>
      {open ? (
        <section className="noki-idjor-panel" aria-label="Idjor">
          <div className="noki-idjor-head">
            <div className="noki-idjor-avatar" aria-hidden="true">
              I
            </div>
            <div className="noki-idjor-title">
              <div>Idjor</div>
              <span>{labels.assistantLabel}</span>
            </div>
            <button className="noki-idjor-close" type="button" aria-label="Fermer Idjor" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className="noki-idjor-messages noki-scrollbar" aria-live="polite">
            {messages.map((message, index) => (
              <div className="noki-idjor-message" data-role={message.role} key={`${message.role}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="noki-idjor-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={labels.placeholder}
              aria-label={labels.placeholder}
            />
            <button type="submit" aria-label="Envoyer à Idjor">
              ➤
            </button>
          </form>
        </section>
      ) : null}

      <button
        className="noki-idjor-trigger"
        type="button"
        aria-label={triggerLabel}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="noki-idjor-sonar" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="noki-idjor-label">{triggerLabel}</span>
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
