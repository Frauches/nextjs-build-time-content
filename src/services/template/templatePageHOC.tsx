import Head from "next/head";
import { TemplateConfigProvider } from "./TemplateConfigContext";
import type { TemplateConfig } from "./withTemplateConfig";

interface TemplatePageHOCProps {
  title?: string;
}

export default function templatePageHOC(
  Component,
  templatePAgeHOCPRops: TemplatePageHOCProps = {}
) {
  return function WrappedComponent(props: { templateConfig: TemplateConfig }) {
    console.log("templatePageHOC", props);
    const { templateConfig } = props ?? {};
    return (
      <>
        <Head>
          <title>
            {templatePAgeHOCPRops?.title
              ? `${templatePAgeHOCPRops.title} | ${templateConfig.site.title} `
              : templateConfig.site.title}
          </title>
        </Head>

        <TemplateConfigProvider value={templateConfig}>
          <Component {...props} />
        </TemplateConfigProvider>
      </>
    );
  };
}
