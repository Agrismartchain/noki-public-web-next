import Image from "next/image";

import type { Language } from "./content";
import { SITE_COPY } from "./content";

type IntegrationsSectionProps = {
  language: Language;
};

const flowKeys = ["sellerTools", "nokiConnector", "centralApi", "operations", "postbacks", "sellerSystem"] as const;

const integrationLogos = {
  "Google Sheets": {
    src: "/integrations/google-sheets.svg",
    width: 129,
    height: 22,
    fit: "wide",
  },
  Shopify: {
    src: "/integrations/Shopify.svg",
    width: 619,
    height: 184,
    fit: "wide",
  },
  WooCommerce: {
    src: "/integrations/WooCommerce.svg",
    width: 333,
    height: 229,
    fit: "badge",
  },
  YouCan: {
    src: "/integrations/YouCan-4.png",
    width: 1000,
    height: 561,
    fit: "wide",
  },
  Storeino: {
    src: "/integrations/storeino.png",
    width: 685,
    height: 204,
    fit: "wide",
  },
} as const;

function getIntegrationLogo(name: string) {
  return integrationLogos[name as keyof typeof integrationLogos] ?? null;
}

export function IntegrationsSection({ language }: IntegrationsSectionProps) {
  const labels = SITE_COPY[language].integrations;
  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="noki-integrations" id="integrations" aria-labelledby="noki-integrations-title" dir={direction}>
      <div className="noki-integrations-glow noki-integrations-glow-a" aria-hidden="true" />
      <div className="noki-integrations-glow noki-integrations-glow-b" aria-hidden="true" />

      <div className="noki-integrations-intro">
        <h6>{labels.kicker}</h6>
        <h2 id="noki-integrations-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="noki-integrations-shell">
        <div className="noki-integrations-tools">
          <div className="noki-integrations-panel-head">
            <span>{labels.connectorsTitle}</span>
            <small>{labels.flowTitle}</small>
          </div>

          <div className="noki-integrations-connectors" aria-label={labels.connectorsTitle}>
            {labels.connectors.map((connector) => {
              const logo = getIntegrationLogo(connector.name);

              return (
                <article className="noki-integration-connector" key={connector.name}>
                  <span className="noki-integration-mark" data-logo-fit={logo?.fit} aria-hidden="true">
                    <span />
                    {logo ? (
                      <Image
                        className="noki-integration-logo"
                        src={logo.src}
                        alt=""
                        width={logo.width}
                        height={logo.height}
                        unoptimized
                      />
                    ) : (
                      <strong>{connector.mark}</strong>
                    )}
                  </span>
                  <span className="noki-integration-card-copy">
                    <span className="noki-integration-name">{connector.name}</span>
                    <span className="noki-integration-status">{connector.status}</span>
                  </span>
                </article>
              );
            })}
          </div>
        </div>

        <div className="noki-integrations-flow" aria-label={labels.flowTitle}>
          <div className="noki-flow-stream" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          {flowKeys.map((key, index) => (
            <div className="noki-flow-step-wrap" key={key}>
              <article className="noki-flow-step" data-kind={key}>
                <span className="noki-flow-dot" aria-hidden="true" />
                <strong>{labels.flow[key]}</strong>
                {key === "operations" ? (
                  <span className="noki-flow-operations">
                    {labels.operations.map((operation) => (
                      <span key={operation}>{operation}</span>
                    ))}
                  </span>
                ) : null}
              </article>
              {index < flowKeys.length - 1 ? <span className="noki-flow-arrow" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        <div className="noki-integrations-detail">
          <article className="noki-integrations-universal">
            <div>
              <span>{labels.plannedStatus}</span>
              <h3>{labels.universalTitle}</h3>
            </div>
            <p>{labels.universalBody}</p>
          </article>

          <article className="noki-integrations-postbacks">
            <h3>{labels.postbacksTitle}</h3>
            <ol>
              {labels.postbackEvents.map((event) => (
                <li key={event}>
                  <span aria-hidden="true" />
                  {event}
                </li>
              ))}
            </ol>
            <p>{labels.postbacksNote}</p>
          </article>
        </div>
      </div>

      <div className="noki-integrations-capabilities" aria-labelledby="noki-integrations-capabilities-title">
        <h3 id="noki-integrations-capabilities-title">{labels.capabilitiesTitle}</h3>
        <div>
          {labels.capabilities.map((capability) => (
            <article className="noki-integration-capability" key={capability.title}>
              <strong>{capability.title}</strong>
              <span>{capability.items.join(" · ")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
