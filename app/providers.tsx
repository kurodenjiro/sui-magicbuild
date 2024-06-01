"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider>
          <NextUIProvider>
            <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
              <Layout>
                {children}
              </Layout>
            </NextThemesProvider>
          </NextUIProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>

  );
}
