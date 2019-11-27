import uuidv4 from "uuid/v4";

export const LOCAL_STORAGE_KEY = {
  JWT: "cfapp_jwt",
  EMAIL: "cfapp_email",
  NICKNAME: "cfapp_nickname",
  SENDER: "cfapp_sendertoken",
  NOTIFICATION: "cfapp_notification_v1",
  PUSH_ID: "cfapp_push_id",
};

class LocalStorageUtils {
  public getItem(key: string, defaultValue: any): any {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key) || defaultValue;
    }

    return "undefined";
  }

  public setItem(key: string, value: any): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  public removeItem(key: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  public clear(): void {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  }

  public isAuthenticated(): boolean | string {
    const jwt: string = this.getItem(LOCAL_STORAGE_KEY.JWT, "");
    return jwt && jwt !== "undefined";
  }

  public getJWT(): string {
    return this.getItem(LOCAL_STORAGE_KEY.JWT, "");
  }

  public getEmail(): string {
    return this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");
  }

  public getName(): string {
    const email = this.getItem(LOCAL_STORAGE_KEY.EMAIL, "");

    return email.substring(0, email.lastIndexOf("@"));
  }

  public getNickName(): string {
    return this.getItem(LOCAL_STORAGE_KEY.NICKNAME, "");
  }

  public generateSenderToken(): void {
    const token = this.getItem(LOCAL_STORAGE_KEY.SENDER, "");

    if (!token || token === "undefined") {
      const newSenderToken: string = uuidv4();

      this.setItem(LOCAL_STORAGE_KEY.SENDER, newSenderToken);
    }
  }

  public getSenderToken(): string {
    this.generateSenderToken();

    return this.getItem(LOCAL_STORAGE_KEY.SENDER, "guest");
  }

  public syncPush(id: string): void {
    this.setItem(LOCAL_STORAGE_KEY.PUSH_ID, id);
  }

  public getPushID(): string {
    return this.getItem(LOCAL_STORAGE_KEY.PUSH_ID, "");
  }

  public setNotificationLoaded(): void {
    this.setItem(LOCAL_STORAGE_KEY.NOTIFICATION, true);
  }

  public isNotificationLoaded(): boolean | string {
    const loaded: string = this.getItem(LOCAL_STORAGE_KEY.NOTIFICATION, "");
    return loaded && loaded !== "undefined";
  }
}

export default new LocalStorageUtils();
