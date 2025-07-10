import { Component, type ReactNode } from 'react';
import type { SearchResultType } from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '../../../public/no_image_available.png';

interface Props {
  results?: SearchResultType[];
}

export class SearchResults extends Component<Props> {
  render(): ReactNode {
    return (
      <div>
        {this.props.results
          ? this.props.results.map((element, index) => (
              <Card
                key={index}
                img={element.image_url ?? NO_IMAGE}
                title={element.title}
                description={element.description}
              />
            ))
          : 'No results'}
      </div>
    );
  }
}
