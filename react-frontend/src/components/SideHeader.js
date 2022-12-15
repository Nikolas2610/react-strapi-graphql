import React from "react"
import { Link } from "react-router-dom"
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export default function SiteHeader() {
    const { data, error, loading } = useQuery(CATEGORIES);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>



    return (
        <div className="site-header">
            <Link to="/"><h1>Psillovits Reviews</h1></Link>
            <nav className="categories">
                <span>Filter review by category: </span>
                {data.categories.data.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>
                        {category.attributes.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
}