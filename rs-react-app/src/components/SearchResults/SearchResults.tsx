import { Component, type ReactNode } from 'react';
import type { SearchResultType } from '../../api/getDataFromApi';
import { Card } from '../Card/Card';
import NO_IMAGE from '../../../public/no_image_available.png';
import style from './style.module.css';

interface Props {
  results?: SearchResultType[];
}

export class SearchResults extends Component<Props> {
  render(): ReactNode {
    return (
      <div className={style['results-wrapper']}>
        {this.props.results
          ? this.props.results.length === 0
            ? 'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
            : this.props.results.map((element, index) => (
                <Card
                  key={index}
                  source={element.source ?? NO_IMAGE}
                  title={element.title}
                  media_type={element.media_type}
                  description={element.description}
                />
              ))
          : `Enter your word and press 'Search' to start a journey!`}
      </div>
    );
  }
}
