// Test script to verify admin access
const testAdminAccess = async () => {
    try {
        console.log('Testing admin access...');
        // Test login with admin credentials
        const loginResponse = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: 'admin@ecommerce.com',
                password: 'admin123'
            })
        });
        const loginData = await loginResponse.json();
        console.log('Login response:', loginData);
        if (loginResponse.ok) {
            // Get cookies from login response
            const cookies = loginResponse.headers.get('set-cookie');
            console.log('Cookies received:', cookies);
            // Test /auth/me endpoint
            const meResponse = await fetch('http://localhost:5000/auth/me', {
                credentials: 'include',
                headers: {
                    'Cookie': cookies || ''
                }
            });
            const meData = await meResponse.json();
            console.log('Auth/me response:', meData);
            // Test admin posts endpoint
            const postsResponse = await fetch('http://localhost:5000/posts/all', {
                credentials: 'include',
                headers: {
                    'Cookie': cookies || ''
                }
            });
            console.log('Posts/all status:', postsResponse.status);
            if (postsResponse.ok) {
                const postsData = await postsResponse.json();
                console.log('✅ Admin posts access successful! Found', postsData.length, 'posts');
            }
            else {
                const error = await postsResponse.text();
                console.log('❌ Admin posts access failed:', error);
            }
            // Test admin users endpoint
            const usersResponse = await fetch('http://localhost:5000/users/all', {
                credentials: 'include',
                headers: {
                    'Cookie': cookies || ''
                }
            });
            console.log('Users/all status:', usersResponse.status);
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                console.log('✅ Admin users access successful! Found', usersData.length, 'users');
            }
            else {
                const error = await usersResponse.text();
                console.log('❌ Admin users access failed:', error);
            }
        }
    }
    catch (error) {
        console.error('Test error:', error);
    }
};
// Run the test
testAdminAccess();
