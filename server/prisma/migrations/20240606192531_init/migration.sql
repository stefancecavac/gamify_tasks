-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
