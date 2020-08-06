use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use libm::pow;
use std::collections::HashMap;

#[wasm_bindgen]
pub fn say(s: &str) -> String {
  println!("The Rust function say() received {}", s);
  let r = String::from("hello ");
  return r + s;
}

#[wasm_bindgen]
pub fn compute(params: &str) -> u32 {
  let (mode, max_number): (&str, u32) = serde_json::from_str(params).unwrap();
  let result = match mode {
    "brute" => compute_impl_brute(max_number),
    "optimized" => compute_impl_optimized(max_number),
    _ => panic!("不规范的参数")
  };
  result
}
fn compute_impl_brute(n: u32) -> u32 {
  let mut result = 0;
  for a in 1..=n {
    for b in 1..=n {
      for c in 1..=n {
        for d in 1..=n {
          let status = pow(a.into(), 3.0) + pow(b.into(), 3.0) == pow(c.into(), 3.0) + pow(d.into(), 3.0);
          if status {
            result += 1;
          }
        }
      }
    }
  }
  result
}
fn compute_impl_optimized(n: u32) -> u32 {
  let mut result = 0;
  let mut sums: HashMap<String, u32> = HashMap::new();
  for a in 1..=n {
    for b in 1..=n {
      let sum = pow(a.into(), 3.0) + pow(b.into(), 3.0);
      let sum = sum.to_string();
      let count = sums.get(&sum).unwrap_or(&0);
      sums.insert(sum, count + 1);
    }
  }
  for (_, count) in sums.iter() {
    result += count * count;
  }
  result
}