-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cargos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
