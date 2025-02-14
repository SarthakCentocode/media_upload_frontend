export interface TemplateCardProps {
  header: string;
  body: string;
  footer: string;
  templateType?: string;
  mediaSource?: string;
  timestamp?: string;
  actionText?: string;
  onActionClick?: () => void;
}
export interface MobilePreviewProps {
  heading?: string;
  message?: string;
  footer?: string;
  actionText?: string;
  children?: React.ReactNode;
}