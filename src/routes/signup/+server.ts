import { redirect } from "@sveltejs/kit";

export function GET() {
    redirect(307, "https://docs.google.com/forms/d/e/1FAIpQLSfOOr1DDP3J1C0xMn9idFepbhudomMlxSEchcle_QC2lNz00w/viewform", {
        external: true
    })
}