<script lang="js">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase'; // Make sure to import your Supabase client
  
  let email = '';
  let password = '';
  let isSignup = false; // Toggle between login and signup

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@') || !password) {
      alert('Please fill in valid credentials.');
      return;
    }

    try {
      let response;

      if (isSignup) {
        response = await supabase.auth.signUp({ email, password });
        if (response.error) throw response.error;
        alert('Signed up successfully! Now log in.');
      } else {
        response = await supabase.auth.signInWithPassword({ email, password });
        if (response.error) throw response.error;

        alert('Logged in successfully! Redirecting...');
        goto('/appointments/dashboard');
      }
    } catch (error) {
  if (error instanceof Error) {
    alert(`Error: ${error.message}`);
  } else {
    alert('An unknown error occurred');
  }
}
  };

  const toggleAuthMode = () => {
    isSignup = !isSignup;
  };
</script>

<div class="auth-form">
  <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
  <form on:submit={handleAuth}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} placeholder="Enter your email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} placeholder="Enter your password" required />
    </div>
    <button class="bg-primary" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
  </form>

  <p>{isSignup ? 'Already have an account?' : 'Don’t have an account?'} 
    <a href="/appointments/signup/" on:click|preventDefault={toggleAuthMode}>
      {isSignup ? 'Login' : 'Sign up'}
    </a>
  </p>
</div>

<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: #f5f5f5;
    border-radius: 8px;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>

