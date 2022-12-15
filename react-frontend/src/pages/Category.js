import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'

const CATEGORY = gql`
query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
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
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(CATEGORY, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div>
      {data.category.data.attributes.name}
      {data.category.data.attributes.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}
          <ReactMarkdown>{review.attributes.body.substring(0, 200) + '...'}</ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
