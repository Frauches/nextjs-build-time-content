import Head from "next/head";
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
    const { site } = props.templateConfig ?? {};
    return (
      <>
        <Head>
          <title>
            {templatePAgeHOCPRops?.title
              ? `${templatePAgeHOCPRops.title} | ${site.title} `
              : site.title}
          </title>
        </Head>
        <Component {...props} />
      </>
    );
  };
}
