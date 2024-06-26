-- CreateTable
CREATE TABLE "habit" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
