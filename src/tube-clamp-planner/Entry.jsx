import React from 'react'
import { useLocalStorageState } from 'ahooks'
import './connectors/flange'
import './connectors/crossover'
import './connectors/tee'
import './connectors/corner'
import SceneCanvas from './SceneCanvas'
import { useMatch } from 'react-router-dom'
import { PageHeader } from 'antd'
import { Outlet, useNavigate } from 'react-router'

const exampleChain = {
  type: 'flange',
  endConnections: [{
    type: 'tube',
    num: 1,
    length: 30,
    middleConnections: [{
      type: 'crossover',
      position: 20,
      rotation: 45,
      middleConnections: [{
        type: 'tube',
        num: 2,
        position: 10,
        length: 50,
        middleConnections: [
          {
            type: 'tee',
            position: 20,
            // rotation: 180,
            endConnections: [{
              type: 'tube',
              length: 5,
            }],
          }, {
            type: 'tee',
            position: 25,
            // rotation: 180,
            endConnections: [{
              type: 'tube',
              length: 10,
            }],
          }, {
            type: 'tee',
            position: 30,
            // rotation: 180,
            endConnections: [{
              type: 'tube',
              length: 15,
            }],
          }, {
            type: 'tee',
            position: 35,
            // rotation: 180,
            endConnections: [{
              type: 'tube',
              length: 20,
              endConnections: [{
                type: 'corner',
                rotation: 45,
                endConnections: [{
                  type: 'tube',
                  length: 20,
                }],
              }],
            }],
          }
        ],
        endConnections: [{
          type: 'flange'
        }, {
          type: 'flange'
        }]
      }],
    }],
    endConnections: [{
      type: 'tee',
      rotation: 15,
      num: 1,
      middleConnections: [{
        type: 'tube',
        num: 1,
        length: 60,
        position: 30,
        middleConnections: [{
          type: 'tee',
          position: 0,
          rotation: 90,
          marker: 10,
          endConnections: [{
            type: 'tube',
            length: 10,
          }],
        }, {
          type: 'tee',
          position: 5,
          rotation: 30,
        }, {
          type: 'tee',
          position: 10,
          rotation: 45,
        }, {
          type: 'tee',
          position: 15,
          rotation: 60,
        }, {
          type: 'tee',
          position: 20,
          rotation: 0,
        }, {
          type: 'crossover',
          position: 60,
          rotation: 15,
        }, {
          type: 'crossover',
          position: 55,
          rotation: 15,
        }, {
          type: 'crossover',
          position: 50,
          rotation: 30,
        }, {
          type: 'crossover',
          position: 45,
          rotation: 45,
        }, {
          type: 'crossover',
          position: 40,
          rotation: 60,
        }, {
          type: 'crossover',
          position: 35,
          rotation: 0,
        }]
      }],
    }],
  }]
}

const example = {
  length: 202,
  width: 152,
  height: 240,
  brightness: .75,
  chains: [
    {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'floor',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'side-wall',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'back-wall',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'side-wall2',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'back-wall2',
        coords: [100, 50]
      }],
    }
  ]
}

const ControlsEnum = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
}

export default function Entry () {
  const navigate = useNavigate();
  const {params} = useMatch('/tools/tube-planner/:sceneId') || {params: {}};

  return (
    <React.Fragment>
      {!params.sceneId && (
        <PageHeader
          title={'Tube Planner'}
          onBack={params.sceneId ? () => navigate('.') : undefined}
        />
      )}
      <Outlet/>
    </React.Fragment>
  )
}