import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { OAuthClient } from './oauth-client.entity';
import { User } from './user.entity';

@Entity({
  tableName: 'oauth_tokens',
})
export class OAuthToken {
  @PrimaryKey()
  id: number;

  @Property()
  accessToken: string;

  @Property({ nullable: true })
  refreshToken?: string;

  @Property()
  expiresAt: Date;

  @ManyToOne()
  user: User;

  @ManyToOne()
  client: OAuthClient;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date;
}
