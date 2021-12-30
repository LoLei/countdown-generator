import { Global, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Fix auto zoom in on mobile for fields with font size <16px
        https://stackoverflow.com/a/46254706/4644044 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily: 'Roboto, Open Sans, DejaVu Sans, sans serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          fontSizes: { lg: 24, xl: 30 },
          headings: { fontFamily: 'Roboto Condensed, sans-serif' },
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          colorScheme: 'dark',
        }}
      >
        <Global
          styles={(theme) => ({
            'html, body': {
              padding: 0,
              margin: 0,
              fontFamily: 'Roboto, Open Sans, DejaVu Sans, sans-serif',
            },
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
              lineHeight: theme.lineHeight,
            },
            '#__next': {
              minHeight: '100vh',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
            },
            a: {
              color: 'inherit',
              textDecoration: 'none',
            },
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },
          })}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}

export default MyApp;
