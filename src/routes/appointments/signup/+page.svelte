<script lang="ts">
    import { goto } from '$app/navigation'; // For redirecting after successful signup
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
  
    const handleSignup = (e) => {
      e.preventDefault();
      
      // Reset error
      error = '';
  
      // Simple validation
      if (!name || !email || !password || !confirmPassword) {
        error = 'All fields are required.';
        return;
      }
  
      if (password !== confirmPassword) {
        error = 'Passwords do not match.';
        return;
      }
  
      if (!email.includes('@')) {
        error = 'Please provide a valid email address.';
        return;
      }
  
      // Simulate successful sign-up
      alert('Signed up successfully! Redirecting to login page...');
      
      // Redirect to login page after signup
      goto('/appointments/login');
    };
</script>
  
<style>
    .signup-form {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: #f9f9f9;
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
      background-color: #28a745;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #218838;
    }
    .error {
      color: red;
      margin-bottom: 1rem;
    }
</style>
  
<div class="signup-form">
    <h2>Sign Up</h2>
  
    {#if error}
      <div class="error">{error}</div>
    {/if}
  
    <form on:submit={handleSignup}>
      <div>
        <label for="name">Full Name:</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          placeholder="Enter your full name"
          required
        />
      </div>
  
      <div>
        <label for="email">Email Address:</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="Enter your email"
          required
        />
      </div>
  
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          placeholder="Create a password"
          required
        />
      </div>
  
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          placeholder="Confirm your password"
          required
        />
      </div>
  
      <button type="submit">Sign Up</button>
    </form>
</div>
  