/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily,
        h6: {
            fontWeight: 500,
            color: theme.heading,
            fontSize: '0.75rem',
        },
        h5: {
            fontSize: '0.875rem',
            color: theme.heading,
            fontWeight: 500,
        },
        h4: {
            fontSize: '1rem',
            color: theme.heading,
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.25rem',
            color: theme.heading,
            fontWeight: 600,
        },
        h2: {
            fontSize: '1.5rem',
            color: theme.heading,
            fontWeight: 700,
        },
        h1: {
            fontSize: '2.125rem',
            color: theme.heading,
            fontWeight: 700,
        },
    };
}