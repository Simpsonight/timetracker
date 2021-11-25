import React from 'react';
import Layout from '../src/components/Layout/Layout';
import NewEntry from '../src/components/NewEntry/NewEntry';
import Entries from '../src/components/Entries/Entries';
import DataList from '../src/components/DataList/DataList';
import ClientContextProvider from '../src/contexts/ClientContext';
import EntryContextProvider from '../src/contexts/EntryContext';

export default function Index() {
    return (
        <ClientContextProvider>
            <EntryContextProvider>
                <Layout>
                    <h1>Timetracker</h1>
                    <NewEntry />

                    <h2>Card List</h2>
                    <Entries />

                    <h2>Data List - All Entries</h2>
                    <DataList />
                </Layout>
            </EntryContextProvider>
        </ClientContextProvider>
    );
}
