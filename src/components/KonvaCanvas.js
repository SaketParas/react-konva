import React, { Component } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Arrow } from "react-konva";

const Edge = ({ node1, node2 }) => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;

  const arrowStart = {
    x: node2.x + -radius * Math.cos(angle + Math.PI),
    y: node2.y + radius * Math.sin(angle + Math.PI)
  };

  const arrowEnd = {
    x: node1.x + -radius * Math.cos(angle),
    y: node1.y + radius * Math.sin(angle)
  };

  return (
    <Arrow
      tension={0.2}
      points={[arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y]}
      stroke="#000"
      fill="#000"
      strokeWidth={3}
      pointerWidth={6}
    />
  );
};

function generateStItems(type) {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: "node-" + i,
      type: type,
      color: Konva.Util.getRandomColor()
    });
  }
  // console.log(items)
  return items;
}

function generateEdItems(type) {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: "node-" + i,
      type: type,
      color: Konva.Util.getRandomColor()
    });
  }
  // console.log(items)
  return items;
}

class KonvaCanvas extends Component {
  state = {
    startCircles: generateStItems("start"),
    endCircles: generateEdItems("end")
  };
  // state = { ...generateConnectors() };

  handleStDragStart = e => {
    const id = e.target.name();
    const items = this.state.startCircles.slice();
    const item = items.find(i => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    this.setState({
      startCirlces: items
    });
  };

  handleEdDragStart = e => {
    // console.log(e.target.position())

    const id = e.target.name();
    const items = this.state.endCircles.slice();
    const item = items.find(i => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    this.setState({
      endCircles: items
    });
  };

  onStDragEnd = e => {
    const id = e.target.name();
    const items = this.startCircles.items.slice();
    const item = this.state.startCircles.find(i => i.id === id);
    const index = this.state.startCircles.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y()
    };
    this.setState({ startCircles: items });
  };

  onEdDragEnd = e => {
    const id = e.target.name();
    const items = this.state.endCircles.slice();
    const item = this.state.endCircles.find(i => i.id === id);
    const index = this.state.endCircles.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y()
    };
    this.setState({ endCircles: items });
  };

  render() {
    console.log(this.state);
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.state.startCircles.map(item => (
            <Circle
              key={item.id}
              name={item.id}
              circType={item.type}
              draggable
              x={item.x}
              y={item.y}
              fill={item.color}
              radius={50}
              onDragStart={this.handleStDragStart}
              onDragEnd={this.handleStDragEnd}
            />
          ))}
          {this.state.endCircles.map(item => (
            <Circle
              key={item.id}
              name={item.id}
              circType={item.type}
              draggable
              x={item.x}
              y={item.y}
              fill={item.color}
              radius={50}
              onDragStart={this.handleEdDragStart}
              onDragEnd={this.handleEdDragEnd}
            />
          ))}
          {this.state.startCircles.map((start, index) => (
            <Edge node1={start} node2={this.state.endCircles[index]} />
          ))}
        </Layer>
      </Stage>
    );
  }
}
export default KonvaCanvas;