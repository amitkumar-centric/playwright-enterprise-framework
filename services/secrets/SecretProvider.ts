export interface SecretProvider {

  get(key: string): Promise<string>;

  has(key: string): Promise<boolean>;

}