// Create a custom type declaration for your application
// typings/session.d.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

declare module '@ioc:Adonis/Core/Session' {
  interface SessionContract {
    flash(key: string, value: any): void;
    flashMessages: any; // This type depends on your actual flash messages structure
  }
}
