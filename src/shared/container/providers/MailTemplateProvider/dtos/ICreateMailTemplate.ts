interface TemplateOptions {
  [key: string]: string | number;
}

export default interface ICreateMailTemplate {
  file: string;
  variables: TemplateOptions;
}
