import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string; // 소셜 로그인 시 사용될 이메일

  @Property({ nullable: true })
  password?: string; // 비밀번호는 소셜 로그인 사용자에겐 필요 없음

  @Property({ nullable: true })
  provider?: string; // TO-DO: Enum으로 정의

  @Property({ nullable: true })
  providerId?: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ default: true })
  isActive: boolean = true;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date;

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date;
}

// TO-DO: 탈퇴 이후의 시나리오에 따른 동작이나 데이터조치
