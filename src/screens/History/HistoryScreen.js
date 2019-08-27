import React, {Component} from 'react';
import {
  LayoutAnimation,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import styles from './_history';

class ExpandableItemComponent extends Component {
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.date}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>
              Water Consumption :{' '}
              {this.props.item.waterConsumption
                ? this.props.item.waterConsumption
                : 0}
              {this.props.item.waterConsumption > 1 ? ' Glasses' : ' Glass'}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>
              Workout Duration :{' '}
              {this.props.item.workoutDuration
                ? this.props.item.workoutDuration
                : 0}
              {this.props.item.workoutDuration > 1 ? ' Mins' : ' Min'}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <Text style={styles.text}>
              Sleep Time :{' '}
              {this.props.item.sleepTime ? this.props.item.sleepTime : 0}
              {this.props.item.sleepTime > 1 ? ' Hrs' : ' Hr'}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class HistoryScreen extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {listDataSource: []};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.listDataSource != this.state.listDataSource;
  }

  componentWillMount() {
    this.setState({listDataSource: this.props.tracker.tracker});
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    //For Single Expand at a time
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );

    //For Multiple Expand at a time
    //array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    this.setState({listDataSource: this.props.tracker.tracker});
    return (
      <LinearGradient style={{flex: 1}} colors={['#99a5c1', '#D3DAEB']}>
        <View style={styles.container}>
          <Text style={styles.topHeading}>Fitness History</Text>
          <ScrollView>
            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.date}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
              />
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracker: state.fitnessTracker,
  };
};

export default connect(mapStateToProps)(HistoryScreen);
