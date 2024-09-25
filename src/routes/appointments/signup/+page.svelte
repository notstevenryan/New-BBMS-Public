<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let phoneNumber = '';
  let error = '';

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error
    error = '';

    // Simple validation
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
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

    // Supabase sign up logic
    try {
      const { user, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone: phoneNumber,  // Add phone number to the user metadata
            display_name: name,   // Add display name to the user metadata
          },
        },
      });

      if (signupError) {
        error = signupError.message;
        return;
      }

      // Insert additional info into a profiles table
      const { error: profileError } = await supabase
        .from('profiles')  // Replace with your actual profiles table name
        .insert([{ id: user.id, phone: phoneNumber, display_name: name }]);

      if (profileError) {
        error = profileError.message;
        return;
      }

      alert('Signed up successfully! Redirecting to login page...');
      goto('/appointments/login');

    } catch (err) {
      error = 'An error occurred during sign up.';
    }
  };
</script>

<main>
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
        <label for="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          bind:value={phoneNumber}
          placeholder="0912-345-6789"
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
</main>

<style>
  .signup-form {
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
    background-color: #007bff;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
