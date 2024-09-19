<?php

namespace Database\Migrations;

use Database\SchemaMigration;

class UpdateUsersTable2 implements SchemaMigration
{
    public function up(): array
    {
        // マイグレーションロジックをここに追加してください
        return [
            "ALTER TABLE users add column email_verified boolean default false "
        ];
    }

    public function down(): array
    {
        // ロールバックロジックを追加してください
        return [
            "ALTER TABLE users DROP COLUMN email_verified"
        ];
    }
}