import React from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default function ReviewDetails() {
    const { id } = useParams();
    const { data, error, loading } = useQuery(REVIEW, {
        variables: { id: id }
    });
    // const { data, error, loading } = useFetch(`http://localhost:1340/api/reviews/${id}`);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div className="review-card">
            <div className="rating">{data.review.data.attributes.rating}</div>
            <h2>{data.review.data.attributes.title}</h2>
            {data.review.data.attributes.categories.data.map(c => (
                <small key={c.id}>{c.attributes.name}</small>
            ))}
            <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
        </div>
    )
}
