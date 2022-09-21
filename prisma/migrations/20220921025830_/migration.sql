-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "GoLink" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "short_name" STRING NOT NULL,
    "full_link" STRING NOT NULL,

    CONSTRAINT "GoLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoLinkParam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "go_link_id" UUID NOT NULL,
    "path_parameter_number" INT4 NOT NULL,
    "query_parameter_name" STRING NOT NULL,

    CONSTRAINT "GoLinkParam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GoLink_user_id_short_name_key" ON "GoLink"("user_id", "short_name");

-- CreateIndex
CREATE UNIQUE INDEX "GoLinkParam_go_link_id_path_parameter_number_key" ON "GoLinkParam"("go_link_id", "path_parameter_number");

-- CreateIndex
CREATE UNIQUE INDEX "GoLinkParam_go_link_id_query_parameter_name_key" ON "GoLinkParam"("go_link_id", "query_parameter_name");

-- AddForeignKey
ALTER TABLE "GoLink" ADD CONSTRAINT "GoLink_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoLinkParam" ADD CONSTRAINT "GoLinkParam_go_link_id_fkey" FOREIGN KEY ("go_link_id") REFERENCES "GoLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
