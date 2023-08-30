import { BaseCommand } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RemodedExpiredToken extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'removed:expired_token'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true, // my problem for namespace Database load when this property equal false

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Removing expired tokens...')

    const deletedRows = await Database.from('api_tokens')
      .where('expires_at', '<', new Date())
      .delete()

    if (deletedRows > 0) {
      this.logger.info(`Deleted ${deletedRows} expired tokens.`)
    } else {
      this.logger.info('No expired tokens found.')
    }

    this.logger.info('Finished removing expired tokens.')
  }

}
