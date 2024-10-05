import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'oauth_clients',
})
export class OAuthClient {
  @PrimaryKey()
  id: number;

  @Property()
  clientId: string; // 클라이언트 ID (고유)

  @Property()
  clientSecret: string; // 클라이언트 비밀키 (암호화)

  @Property()
  redirectUri: string; // 리다이렉트 URI

  @Property()
  grantType: string; // 지원하는 Grant Type (e.g., authorization_code, password 등)

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date;
}
