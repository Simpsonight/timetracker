import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/src/createEmotionCache';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from '@/src/themes';

import ClientContextProvider from '@/src/store/contexts/ClientContext';
import EntryContextProvider from '@/src/store/contexts/EntryContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    // TODO: for custom theming
    const customization = {}

    return (
        <CacheProvider value={emotionCache}>
            <StyledEngineProvider injectFirst>
                <Head>
                    <title>Timetracker</title>
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>
                <ThemeProvider theme={themes(customization)}>
                    <ClientContextProvider>
                        <EntryContextProvider>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            <Component {...pageProps} />
                        </EntryContextProvider>
                    </ClientContextProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </CacheProvider>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
