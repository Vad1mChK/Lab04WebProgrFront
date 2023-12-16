/**
 * Data structure for representing error page content.
 */
export default interface ErrorPageData {
    /**
     * The HTTP status code as a string.
     */
    statusCode: string;

    /**
     * The internal character code name from Ace Attorney.
     */
    aaCharName: string;

    /**
     * The display name of the Ace Attorney character.
     */
    aaCharDisplayName: string;

    /**
     * The URL to the sprite image of the Ace Attorney character.
     */
    aaCharSpriteUrl: string;

    /**
     * Optional flag to indicate if the sprite should be flipped.
     */
    aaCharSpriteFlip?: boolean;

    /**
     * The message to display on the error page.
     */
    message: string;
}