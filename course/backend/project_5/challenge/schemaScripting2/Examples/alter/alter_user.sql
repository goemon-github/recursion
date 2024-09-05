ALTER TABLE user ADD (
 subscription VARCHAR(255),
 subscription_status VARCHAR(255),
 subscription_created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
 subscription_ends_at DATETIME DEFAULT CURRENT_TIMESTAMP
)