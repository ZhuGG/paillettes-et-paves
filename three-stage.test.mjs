import test from 'node:test';
import assert from 'node:assert/strict';
import {createTheatre} from './three-stage.mjs';
test('a device without WebGL2 keeps the 2D game available',async()=>{assert.equal(await createTheatre({getContext:()=>null}),null);});
test('a denied graphics context is handled as a 2D fallback',async()=>{assert.equal(await createTheatre({getContext:()=>{throw Error('Graphics disabled');}}),null);});
