"use server";

import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";
export async function createPRD(
  featureRequestId: string,
  title: string,
  content: string
)
 {
  const latestPRD = await getLatestPRD(featureRequestId);

const nextVersion = latestPRD
  ? latestPRD.version + 1
  : 1;
  return await prisma.pRD.create({
    data: {
      title,
      content,
      version: nextVersion,
      featureRequestId,
      
    },
  });
}
export async function getLatestPRD(
  featureRequestId: string
) {
  return await prisma.pRD.findFirst({
    where: {
      featureRequestId,
    },
    orderBy: {
      version: "desc",
    },
  });
}
export async function createPRDVersion(
  prdId: string,
  title: string,
  content: string
) {
  const currentPRD = await prisma.pRD.findUnique({
    where: {
      id: prdId,
    },
  });

  if (!currentPRD) {
    throw new Error("PRD not found.");
  }

const latestPRD = await getLatestPRD(
  currentPRD.featureRequestId
);

return await prisma.pRD.create({
  data: {
    title,
    content,
    version: latestPRD
      ? latestPRD.version + 1
      : 1,
    generatedByAI: false,
    featureRequestId: currentPRD.featureRequestId,
  },
});
}
export async function getPRDById(
  prdId: string
) {
  return await prisma.pRD.findUnique({
    where: {
      id: prdId,
    },
  });
}
export async function restorePRDVersion(
  prdId: string
) {
  const prd = await getPRDById(prdId);

  if (!prd) {
    throw new Error("PRD not found.");
  }

  return await createPRD(
    prd.featureRequestId,
    prd.title,
    prd.content
  );
}

export async function restorePRDAction(formData: FormData) {
  const prdId = formData.get("prdId") as string;
  const featureId = formData.get("featureId") as string;

  await restorePRDVersion(prdId);

  redirect(`/features/${featureId}`);
}