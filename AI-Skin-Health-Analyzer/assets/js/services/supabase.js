// services/supabase.js
// Mocked Supabase Client for Development

export const supabase = {
    auth: {
        signUp: async ({ email, password }) => {
            console.log('Mock: User signed up', email);
            return { data: { user: { id: 'mock-uuid-123', email } }, error: null };
        },
        signInWithPassword: async ({ email, password }) => {
            console.log('Mock: User signed in', email);
            return { data: { user: { id: 'mock-uuid-123', email } }, error: null };
        },
        signOut: async () => {
            console.log('Mock: User signed out');
            return { error: null };
        },
        getUser: async () => {
            return { data: { user: null }, error: null };
        }
    },
    from: (table) => ({
        select: () => ({
            eq: () => ({ data: [], error: null })
        }),
        insert: (data) => {
            console.log(`Mock: Inserted into ${table}`, data);
            return { data, error: null };
        },
        update: (data) => ({
            eq: () => {
                console.log(`Mock: Updated ${table}`, data);
                return { data, error: null };
            }
        })
    })
};
