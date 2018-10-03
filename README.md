# React State Store

An alternative to Redux, React State Store (RSS) provides a simple way to manage 
global state without all of the boilerplate.

## Installation

## Description

RSS differs from the [Flux Architecture](http://facebook.github.io/flux/). Flux dispatches to 
all registered callbacks, while RSS dispatches only to the relevant callbacks.

It is sync and does not use or expect Promises.

Immutability?

## Usage

Use RSS `connect` which returns a _higher order component_ wrapper. This wrapper will handle
the listeners:

```jsx harmony
import {connect} from 'react-state-store';

class Item extends React.Component {
	render () {
		return (
			<div>
                {this.props.name && <Display />}
			</div>
		);
	}
}

export default connect('name', List);
```
The second argument of `connect` is a React component. The first argument, in this case, is
the property for which to subscribe. When `name` changes in the store, the Item.props object 
will be updated and `render()` will be triggered.

There can be multiple subscriptions, separated by commas.

A subscription has two aspects, before and after the period-delimiter: an optional namespace, 
and the actual property that will be pushed to the `props` object.

    [namespace].[property]

Example:

```jsx harmony
import {connect} from 'react-state-store';

class List extends React.Component {
	render () {
		return (
			<div>
                {this.props.one && <DisplayOne />}
                {this.props.two && <DisplayTwo />}
			</div>
		);
	}
}

export default connect('subscription.one,subscription.two', List);
```
Typically, the namespace is used to specify an individual component. If multiple components are
subscribing to a `name` property, the namespace is the way you identify which is which.

To change a property, you set it in the store:

```jsx harmony
import {store} from 'react-state-store';

store.set('name', 'Display Name');
```
Multiple properties may be set at once by passing an object:

```jsx harmony
store.set({
	'subscription.one': 'Display One Name',
	'subscription.two': 'Display Two Name'
});
```

### Methods

#### `set(key, value)`

Described above. Sets a state property via the arguments of key/value, or an object of key/value pairs.

#### `get()`

`get(key)` will return a property from the store. If no key is passed, the entire state will be
returned. Any objects returned are copies, so that internal state cannot be altered:
 
```jsx harmony
const name = store.get('name');
const allState = store.get();

store.set('toggle', !store.get('toggle'));
```

#### `subscribe(instance, subscriptions)`

Typically used internally via `connect`, but could be used as standalone. 

`instance` is expected to be a React component or a standard function.
`subscriptions` is a string, which could be:
 * a key (property name)
 * a namepace(dot)key
 * multiple namespace/keys, separated by commas.
 
`subscribe` returns a function that when called, will remove the subscription (unsubscribe).

#### `unsubscribe(instance)`

Remove the subscription.

#### `flush()`

Clears the store's state and subscriptions. Primarily used for testing.


