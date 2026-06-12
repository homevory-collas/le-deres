import { ContentEditor } from '@/components/admin/cms/ContentEditor'
export const metadata = { title: 'Add Content — Admin' }
export default function AdminContentNewPage() {
  return <ContentEditor mode="create" />
}
