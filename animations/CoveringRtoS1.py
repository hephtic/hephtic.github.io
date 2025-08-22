from manim import *
import numpy as np

class CoveringRtoS1(Scene):
    def construct(self):
        # Title with the covering map
        title = MathTex(r"\mathbb{R} \to S^1: t \mapsto e^{it}").to_edge(UP)
        self.play(Write(title))

        # Geometry: circle (S^1) and number line (R), shifted lower
        circle = Circle(radius=2).shift(UP*0.5)
        circle.set_stroke(width=4)

        x_min, x_max = -4*np.pi, 4*np.pi
        number_line = NumberLine(
            x_range=[x_min, x_max, np.pi],
            length=12,
            include_numbers=False,
            include_tip=True,
        ).shift(DOWN*2.2)

        # Labels for domain and codomain
        circle_label = Tex(r"$S^1$ (Circle)").scale(0.7).next_to(circle, UR, buff=0.1).shift(DOWN*0.5)
        line_label = Tex(r"$\mathbb{R}$ (Real Line)").scale(0.7).next_to(number_line, DR, buff=0.3).shift(LEFT*1.5)

        self.play(
            Create(circle), Create(number_line),
            FadeIn(circle_label), FadeIn(line_label)
        )

        # Explanatory text
        intro_text = Tex(
            "The exponential map wraps the real line\\\\infinitely many times around the circle"
        ).scale(0.5).to_corner(UR)
        self.play(FadeIn(intro_text))
        self.wait(1)

        # Mark multiples of 2π on R
        k_vals = list(range(-3, 4))
        two_pi_marks = VGroup()
        two_pi_labels = VGroup()
        
        for k in k_vals:
            t = 2*np.pi*k
            mark = number_line.get_tick(t).set_stroke(width=3, color=BLUE)
            two_pi_marks.add(mark)
            
            # Add labels for key points
            if k in [-2, -1, 0, 1, 2]:
                if k == 0:
                    label = MathTex("0").scale(0.5).next_to(mark, DOWN, buff=0.1)
                else:
                    label = MathTex(f"{k}\\cdot 2\\pi").scale(0.5).next_to(mark, DOWN, buff=0.1)
                two_pi_labels.add(label)

        self.play(
            LaggedStart(*[Create(m) for m in two_pi_marks], lag_ratio=0.08),
            FadeIn(two_pi_labels)
        )

        # Show that 2π intervals map to full circle
        period_text = Tex(
            "Each interval of length $2\\pi$ maps\\\\bijectively onto the entire circle"
        ).scale(0.5)
        period_text.to_corner(UL)
        self.play(FadeIn(period_text))

        # Highlight interval bands (for local neighborhoods)
        band_width = 0.35
        base_left = -np.pi
        base_right = np.pi
        bands = VGroup()
        
        for k in k_vals:
            left = base_left + 2*np.pi*k
            right = base_right + 2*np.pi*k
            left_point = number_line.n2p(left)
            right_point = number_line.n2p(right)
            rect = Rectangle(
                width=np.linalg.norm(right_point - left_point),
                height=band_width,
                stroke_width=0,
                fill_opacity=0.15,
                fill_color=YELLOW,
            )
            rect.move_to((left_point + right_point)/2 + DOWN*2.2)
            bands.add(rect)
            
        self.play(FadeIn(bands, lag_ratio=0.05))
        self.wait(1)

        # Remove intro texts to make room for animation
        self.play(FadeOut(intro_text), FadeOut(period_text))

        # Tracker for t
        t_tracker = ValueTracker(-3*np.pi)

        dot_R = always_redraw(
            lambda: Dot(number_line.n2p(t_tracker.get_value()), color=YELLOW)
        )
        dot_S1 = always_redraw(
            lambda: Dot(circle.point_at_angle(t_tracker.get_value()), color=YELLOW)
        )

        def map_arrow():
            start = number_line.n2p(t_tracker.get_value())
            end = circle.point_at_angle(t_tracker.get_value())
            return Arrow(start, end, buff=0.08, stroke_width=3, max_tip_length_to_length_ratio=0.08)

        arrow = always_redraw(map_arrow)

        # Show the mapping in action
        mapping_text = Tex(
            "Watch how points on $\\mathbb{R}$ map to points on $S^1$"
        ).scale(0.5).to_edge(DOWN)
        self.play(
            FadeIn(dot_R), FadeIn(dot_S1), FadeIn(arrow),
            FadeIn(mapping_text)
        )

        # Animate covering behavior
        self.play(t_tracker.animate.set_value(3*np.pi), run_time=8, rate_func=linear)
        self.wait(0.5)

        self.play(FadeOut(mapping_text))

        # Highlight fiber over 1 ∈ S^1 (the point at angle 0)
        fiber_text = Tex(
            "Each point on $S^1$ has infinitely many preimages\\\\separated by multiples of $2\\pi$"
        ).scale(0.5).to_edge(DOWN)
        self.play(FadeIn(fiber_text))

        basepoint = Dot(circle.point_at_angle(0), color=BLUE).scale(1.2)
        basepoint_label = MathTex("0").scale(0.6).next_to(basepoint, RIGHT, buff=0.1)
        self.play(FadeIn(basepoint), FadeIn(basepoint_label))

        # Show all preimages of the point 0 on the circle
        fiber_dots = VGroup()
        fiber_arrows = VGroup()
        for k in k_vals:
            t = 2*np.pi*k
            d = Dot(number_line.n2p(t), color=BLUE).scale(0.9)
            fiber_dots.add(d)
            a = DashedLine(
                number_line.n2p(t), 
                circle.point_at_angle(0), 
                dash_length=0.12, 
                stroke_width=2,
                color=BLUE
            )
            fiber_arrows.add(a)

        self.play(FadeIn(fiber_dots), FadeIn(fiber_arrows), run_time=2)
        self.wait(2)

        self.play(FadeOut(fiber_text))

        # Show local homeomorphism property
        local_text = Tex(
            "Small arcs on $S^1$ have disjoint preimages\\\\(local homeomorphism property)"
        ).scale(0.5).to_edge(DOWN)
        self.play(FadeIn(local_text))

        # Small arc and its disjoint preimages
        arc = ArcBetweenPoints(
            circle.point_at_angle(-np.pi/3),
            circle.point_at_angle(np.pi/3),
            radius=2
        ).set_stroke(GREEN, width=6)

        interval_length = 2*np.pi/3
        preimage_intervals = VGroup()
        for k in range(-2, 3):
            center = 2*np.pi*k
            left = center - interval_length/2
            right = center + interval_length/2
            seg = Line(
                number_line.n2p(left), 
                number_line.n2p(right)
            ).set_stroke(GREEN, width=6)
            preimage_intervals.add(seg)

        self.play(Create(arc))
        self.play(Create(preimage_intervals))
        self.wait(2)

        self.play(FadeOut(local_text))

        # Final demonstration: complete loop
        final_text = Tex(
            "Moving $2\\pi$ units on $\\mathbb{R}$ corresponds\\\\to one complete revolution on $S^1$"
        ).scale(0.5).to_edge(DOWN)
        self.play(FadeIn(final_text))

        # Final loop around
        self.play(
            t_tracker.animate.set_value(t_tracker.get_value() + 2*np.pi), 
            run_time=4, 
            rate_func=linear
        )
        self.wait(1)

        # Summary
        self.play(FadeOut(final_text))
        summary = Tex(
            "$\\mathbb{R}$ is the universal covering space of $S^1$\\\\with covering group $\\mathbb{Z}$"
        ).scale(0.5).to_edge(DOWN)
        self.play(FadeIn(summary))
        self.wait(3)