-- CreateEnum
CREATE TYPE "shipment_status" AS ENUM ('PICKED_UP', 'IN_WAREHOUSE', 'IN_TRANSIT', 'AT_PORT', 'CUSTOMS_CLEARANCE', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "document_type" AS ENUM ('INVOICE', 'PACKING_LIST', 'BILL_OF_LADING', 'CERTIFICATE', 'CUSTOMS_DECLARATION', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "company_name" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tracking_number" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "shipment_status" NOT NULL DEFAULT 'PICKED_UP',
    "weight" DECIMAL(10,2) NOT NULL,
    "volume" DECIMAL(10,3) NOT NULL,
    "estimated_cost" DECIMAL(12,2),
    "estimated_arrival" TIMESTAMP(3),
    "sender_name" TEXT,
    "sender_address" TEXT,
    "receiver_name" TEXT,
    "receiver_address" TEXT,
    "receiver_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment_status_history" (
    "id" SERIAL NOT NULL,
    "shipment_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipment_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "shipment_id" INTEGER NOT NULL,
    "document_type" "document_type" NOT NULL,
    "file_url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "file_size" INTEGER,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_tracking_number_key" ON "shipments"("tracking_number");

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_status_history" ADD CONSTRAINT "shipment_status_history_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
