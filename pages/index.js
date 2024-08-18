import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setJournals(data);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div>
      <h1>My Journals</h1>
      <Link href="/new">
        <button>Add New Journal</button>
      </Link>
      <ul>
        {journals.map((journal) => (
          <li key={journal.id}>
            <h2>{journal.title}</h2>
            <p>{journal.content}</p>
            <small>{new Date(journal.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
