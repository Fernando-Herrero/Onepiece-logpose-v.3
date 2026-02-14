import { PageSpinner } from "@/src/components/shared/PageSpinner";
import { useTranslations } from "next-intl";

export default function PublicLoading() {
    const t = useTranslations("profile");

    return <PageSpinner message={t("loading")} fullPage showDots />;
}
