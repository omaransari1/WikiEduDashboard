import React from 'react';
import MainspaceChecklist from '../common/mainspace_checklist.jsx';
import CourseUtils from '../../utils/course_utils.js';

const MyAssignment = React.createClass({
  displayName: 'MyAssignment',

  propTypes: {
    assignment: React.PropTypes.object.isRequired,
    course: React.PropTypes.object.isRequired,
    last: React.PropTypes.bool
  },

  isEnglishWikipedia() {
    return this.props.course.home_wiki.language === 'en' && this.props.course.home_wiki.project === 'wikipedia';
  },

  render() {
    const isEnglishWikipedia = this.isEnglishWikipedia();
    let assignmentType;
    let checklist;
    let sandbox;
    let sandboxTalk;
    let pageviews;
    if (this.props.assignment.article_id) {
      const article = CourseUtils.articleFromTitleInput(this.props.assignment.article_url);
      const pageviewUrl = `https://tools.wmflabs.org/pageviews/?project=${article.language}.${article.project}.org&platform=all-access&agent=user&range=latest-90&pages=${article.title}`;
      pageviews = <a className="button dark small" href={pageviewUrl} target="_blank">Pageviews</a>;
    }

    // Assigned article that does not yet exist in mainspace
    if (this.props.assignment.role === 0 && !this.props.assignment.article_id) {
      assignmentType = 'Creating a new article: ';
      if (isEnglishWikipedia) {
        checklist = <MainspaceChecklist />;
        sandbox = <a className="button dark small" href="https://en.wikipedia.org/wiki/Special:MyPage/sandbox" target="_blank">Sandbox</a>;
        sandboxTalk = <a className="button dark small" href="https://en.wikipedia.org/wiki/Special:MyTalk/sandbox" target="_blank">Sandbox talk</a>;
      }
    // Assigned articel that already exists
    } else if (this.props.assignment.role === 0) {
      assignmentType = 'Improving: ';
    // Review assignment
    } else {
      assignmentType = 'Reviewing: ';
    }

    let divider;
    if (!this.props.last) {
      divider = <hr />;
    }
    return (
      <div>
        {assignmentType}<a href={this.props.assignment.article_url}>{this.props.assignment.article_title}</a>
        <div className="pull-right">
          {sandbox}
          {sandboxTalk}
          {checklist}
          {pageviews}
        </div>
        {divider}
      </div>
    );
  }
});

export default MyAssignment;
