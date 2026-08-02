import { ArticleEditor } from "../components/ArticleEditor";
import { cmsService } from "@/services/cms";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await cmsService.getArticleById(params.id);
  
  return <ArticleEditor initialData={article} />;
}
